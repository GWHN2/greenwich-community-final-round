export const idlFactory = ({ IDL }) => {
  const ListId = IDL.Nat;
  const listNft = IDL.Record({
    'url' : IDL.Text,
    'status' : IDL.Text,
    'tokenId' : IDL.Nat,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'seller' : IDL.Principal,
    'price' : IDL.Nat,
    'listId' : IDL.Nat,
  });
  const dip721Metadata = IDL.Record({
    'url' : IDL.Text,
    'owner' : IDL.Principal,
    'name' : IDL.Text,
    'description' : IDL.Text,
  });
  const Marketplace = IDL.Service({
    'buyNFT' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat, IDL.Nat, ListId],
        [IDL.Bool],
        [],
      ),
    'getAllLists' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(ListId, listNft))],
        ['query'],
      ),
    'listNft' : IDL.Func([IDL.Nat, IDL.Nat, dip721Metadata], [IDL.Bool], []),
  });
  return Marketplace;
};
export const init = ({ IDL }) => { return [IDL.Principal, IDL.Principal]; };
