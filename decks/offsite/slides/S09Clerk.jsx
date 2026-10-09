/** What Clerk does, a pill each, sorted into groups: for the customer on the
 *  left, and what it lets the customer do on the right. */
export default function S09Clerk() {
  return <section className="slide" />
}

// The two boxes are the deck's overlay (components/Sides.jsx), shared with
// slide 10; this slide only says which of their contents to show. The pills
// themselves are in sides.js.
S09Clerk.sides = 'features'

S09Clerk.notes = `
It gives you all the authentication options available, including biometrics.
You don’t need to store any passwords in your database and risk being hacked.
They make sure that signups are working all the time.
Are up to date, and that everything works smoothly.
But then, on the other side, they also give you these building components that you can integrate into your application and adjust to whatever look and feel you prefer.
And they give you option to extend information about users and organizations with anything you need.

So, if you are a customer and are thinking about implementing authentication and authorization, would you say:
I don’t need Clerk.
Claude Code can do all of it.
I am just gonna vibe code it.
`
