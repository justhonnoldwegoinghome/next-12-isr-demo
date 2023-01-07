## ISR

- ISR based on calendar time
- Add `revalidate=10` in `getStaticProps`

## On-demand ISR

- ISR based on demand
- Add Next API handler
- Hit Next API endpoint to force revalidation

## ISR + On-demand ISR

- Possible to use both together

## Questions

### What if revalidation occurs faster than changes in DB?

- Say we trigger a revalidation after a POST request. When a POST request is made, we first make a (1) network request to our API and hence DB. Almost immediately, we make another (2) network request to our Next API which then makes yet another (3) network request to our API.
- What if time taken for (1) happens to be more than time taken for (2) + (3)? This would waste the revalidation efforts since DB isn't updated yet.

## Tips

### On-demand ISR + useSWR

- Say we trigger a revalidation after a POST request.
- Say time taken for (1) is always less than time taken for (2) + (3)

- Using on-demand ISR alone: when a user makes a POST request, he/she doesn't get the fresh data until the page is refreshed.
- To solve this, we can use useSWR together with on-demand ISR. When user makes a POST request, we use swr's `mutate` to instantly reflect the changes in DB. At the same time, we trigger a revalidation.
- Example: https://github.com/joe-bell/example-next-isr-with-swr
- Note that in the example, the author used SWR + normal ISR. Quite sure we can use SWR + on-demand ISR too.
