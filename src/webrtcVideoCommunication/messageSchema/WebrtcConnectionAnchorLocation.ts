// ############
/**
 * <strike>said, this is encapsulated. dont export this.
 * <strike>just Manage (the uniqueness of) this within the React App scope.
 */
/**
 * // type WebrtcConnectionAnchorId = string;
 * @hack (this seems not working when the other way assing (seems not exported and imported pb))
 * // https://stackoverflow.com/questions/26810574/is-there-a-way-to-create-nominal-types-in-typescript-that-extend-primitive-types
 */

declare const WebrtcConnectionAnchorIdSymbol: unique symbol;
export type WebrtcConnectionAnchorId = string & { [WebrtcConnectionAnchorIdSymbol]: never };
declare const SignalserverWebsocketClientIdSymbol: unique symbol;
export type SignalserverWebsocketClientId = string & { [SignalserverWebsocketClientIdSymbol]: never };
declare const MediaStreamIdSymbol: unique symbol;
export type MediaStreamId = string & { [MediaStreamIdSymbol]: never };
declare const WebrtcConnectionAnchorLocationIdSymbol: unique symbol;
export type WebrtcConnectionAnchorLocationId = string & { [WebrtcConnectionAnchorLocationIdSymbol]: never };

export class WebrtcConnectionAnchorLocation {
  constructor(
    public readonly signalserverWebsocketClientId: SignalserverWebsocketClientId,
    public readonly webrtcConnectionAnchorId: WebrtcConnectionAnchorId //
  ) {}

  // /** @deprecated */
  // public readonly __typeDiscriminatorForClassTransformer = 'WebrtcConnectionAnchorLocation';
  // get __typeDiscriminatorForClassTransformer() { return this.___typeDiscriminatorForClassTransformer; }
  // cannot use static? also dk public .. classtransformer sucks // dfk that is not showing as a class ...
  equals(other: WebrtcConnectionAnchorLocation | undefined | null): boolean {
    if (other == null) return false;
    return this.signalserverWebsocketClientId === other.signalserverWebsocketClientId && this.webrtcConnectionAnchorId === other.webrtcConnectionAnchorId;
  }

  /** @deprecated use with caution (aga Js doesnt have .equals() like Java) */
  public toStringId(): WebrtcConnectionAnchorLocationId {
    return JSON.stringify(this) as WebrtcConnectionAnchorLocationId;
  }

  public static toSessionIdWithPeer(self: WebrtcConnectionAnchorLocation, peer: WebrtcConnectionAnchorLocation): string {
    return self.toStringId() + peer.toStringId();
  }
}
