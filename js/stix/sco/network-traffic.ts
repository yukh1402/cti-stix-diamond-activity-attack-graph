
export const NETWORK_TRAFFIC_TYPE = "network-traffic";

export interface NetworkTrafficSCO {
  src_ref: string;
  dst_ref: string;
  dst_port: number;
  src_port: number;
  x_direction: string;
  start: Date;
  protocols: string [];
  x_guid: string;
}
