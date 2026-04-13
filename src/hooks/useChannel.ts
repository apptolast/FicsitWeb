import { useEffect } from "react";
import { initEcho } from "../lib/echo";

/**
 * Subscribe to a Laravel Echo private channel for a single event.
 *
 * @param channelName — the channel name WITHOUT the `private-` prefix
 *                     (Echo adds it automatically). Example: `servers.1`.
 * @param eventName   — the broadcast event name as returned by `broadcastAs()`.
 * @param handler     — invoked with the event payload every time the event fires.
 *
 * The subscription is torn down when the component unmounts or when any of
 * the arguments change.
 */
export function useChannel<T>(
  channelName: string,
  eventName: string,
  handler: (payload: T) => void,
): void {
  useEffect(() => {
    const echo = initEcho();
    const channel = echo.private(channelName);
    channel.listen(`.${eventName}`, handler as (e: unknown) => void);

    return () => {
      channel.stopListening(`.${eventName}`);
      echo.leave(`private-${channelName}`);
    };
  }, [channelName, eventName, handler]);
}
