export enum WebrtcConnectionStateMachineEventTypeName {
  evx__goOnline = 'evx__goOnline',
  evx__goOffline = 'evx__goOffline',
  evx_send__offer_Sent = 'evx_send__offer_Sent',
  evx_receive__offer_Sent = 'evx_receive__offer_Sent',
  evx_send__offer_Accepted = 'evx_send__offer_Accepted',
  evx_receive__offer_Accepted = 'evx_receive__offer_Accepted',
  evx_send__offer_Cancelled = 'evx_send__offer_Cancelled',
  evx_receive__offer_Cancelled = 'evx_receive__offer_Cancelled',
  evx_send__offer_Declined = 'evx_send__offer_Declined',
  evx_receive__offer_Declined = 'evx_receive__offer_Declined',
  evx_send__connection_Closed = 'evx_send__connection_Closed',
  evx_receive__connection_Closed = 'evx_receive__connection_Closed',
                                                                                     
  evx__OfferNegotiationSessionSucceeded = 'evx__OfferNegotiationSessionSucceeded',
  evx__OfferNegotiationSessionFailed = 'evx__OfferNegotiationSessionFailed',
}
