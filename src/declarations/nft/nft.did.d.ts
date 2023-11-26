import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type GenericValue = { 'Nat64Content' : bigint } |
  { 'Nat32Content' : number } |
  { 'BoolContent' : boolean } |
  { 'Nat8Content' : number } |
  { 'Int64Content' : bigint } |
  { 'IntContent' : bigint } |
  { 'NatContent' : bigint } |
  { 'Nat16Content' : number } |
  { 'Int32Content' : number } |
  { 'Int8Content' : number } |
  { 'Int16Content' : number } |
  { 'BlobContent' : Uint8Array | number[] } |
  { 'Principal' : Principal } |
  { 'TextContent' : string };
export type NftError = { 'SelfTransfer' : null } |
  { 'TokenNotFound' : null } |
  { 'TxNotFound' : null } |
  { 'SelfApprove' : null } |
  { 'OperatorNotFound' : null } |
  { 'Unauthorized' : null } |
  { 'ExistedNFT' : null } |
  { 'OwnerNotFound' : null } |
  { 'Other' : string };
export type Result = { 'ok' : bigint } |
  { 'err' : NftError };
export type Result_1 = { 'ok' : TokenMetadata } |
  { 'err' : NftError };
export type Result_2 = { 'ok' : Array<TokenMetadata> } |
  { 'err' : NftError };
export type Result_3 = { 'ok' : [] | [Principal] } |
  { 'err' : NftError };
export interface TokenMetadata {
  'transferred_at' : [] | [bigint],
  'transferred_by' : [] | [Principal],
  'owner' : Principal,
  'operator' : [] | [Principal],
  'properties' : Array<[string, GenericValue]>,
  'token_identifier' : bigint,
  'minted_at' : bigint,
  'minted_by' : Principal,
}
export interface _SERVICE {
  'allTokenMetadata' : ActorMethod<[], Result_2>,
  'balanceOf' : ActorMethod<[Principal], bigint>,
  'greet' : ActorMethod<[string], string>,
  'logo' : ActorMethod<[], [] | [string]>,
  'mint' : ActorMethod<
    [Principal, bigint, Array<[string, GenericValue]>],
    bigint
  >,
  'name' : ActorMethod<[], [] | [string]>,
  'ownerOf' : ActorMethod<[bigint], Result_3>,
  'ownerTokenMetadata' : ActorMethod<[Principal], Result_2>,
  'symbol' : ActorMethod<[], [] | [string]>,
  'tokenMetadata' : ActorMethod<[bigint], Result_1>,
  'totalSupply' : ActorMethod<[], bigint>,
  'transferFrom' : ActorMethod<[Principal, Principal, bigint], Result>,
}
