# Use-Anchor

Utilise `anchor-link` easier in Vue 3.

## Properties

- `isAuthenticated` - reactive string of the authenticated user account name else empty if not logged in
- `logout()` - function to logout
- `login()` - function to login
- `transact(simpleAction[])` - function to trigger transactions which accepts SimpleAction type

## Example

```
const transport = new AnchorLinkBrowserTransport();
const chainId =
  "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";
const link = new AnchorLink({
  transport,
  chains: [
    {
      chainId,
      nodeUrl: "https://eos.greymass.com",
    },
  ],
});

Simple Action

{
  account: string;
  name: string;
  data: { ... };
}

const { login, isAuthenticated, logout, transact } = useAnchor(
    "appName",
    link
);

const transfer = () =>
    transact([
    {
        name: "transfer",
        account: "eosio.token",
        data: {
         from: "account",
         to: "account2",
         memo: "",
         quantity: "0.0001 EOS",
        },
    },
]);
```
