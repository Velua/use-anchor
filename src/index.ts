import { ref } from "vue";
import AnchorLink, { LinkSession } from "anchor-link";

let globalSession: undefined | LinkSession = undefined;

const isAuthenticated = ref("");

const logout = () => {
  const { auth, chainId, identifier } = globalSession as LinkSession;
  globalSession.link.removeSession(identifier, auth, chainId);
  isAuthenticated.value = "";
};

export interface SimpleAction<T> {
  account: string;
  name: string;
  data: T;
}

export const useAnchor = (appName: string, anchor: AnchorLink) => {
  anchor.listSessions(appName).then((sessions) => {
    if (sessions.length > 0) {
      const validSession = sessions[0];

      anchor.restoreSession(appName, validSession.auth).then((session) => {
        if (session) {
          globalSession = session;
          isAuthenticated.value = session.auth.actor.toString();
        }
      });
    }
  });

  const login = async () => {
    const { session } = await anchor.login(appName);
    globalSession = session;
    isAuthenticated.value = session.auth.actor.toString();
  };

  const transact = async (actions: SimpleAction<any>[]) => {
    const authorization = [globalSession.auth] as LinkSession["auth"][];
    const fixedActions = actions.map((action) => ({
      ...action,
      authorization,
    }));
    return globalSession.transact({ actions: fixedActions });
  };

  return {
    transact,
    login,
    isAuthenticated,
    logout,
  };
};
