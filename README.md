## From [Node](https://nodejs.org/en) to [NEXT](https://nextjs.org/)


<div style="text-align: right; color:white; background-color:black ; font-size:x-small;">
‘When I wish to find out how wise, or how stupid, or how good, or how wicked is any one, or what are his thoughts at the moment, I fashion the expression of my face, as accurately as possible, in accordance with the expression of his, and then wait to see what thoughts or sentiments arise in my mind or heart, as if to match or correspond with the expression.’ 
<br/><br/>
─── The Purloined Letter, Edgar Allan Poe
</div>


### Prologue
Being dominated by uncertainity and randomness, *life*, per se, is only a game of unpredictability. Watching carriages come and go in the city, you may easily come to conclusion that they are just too many. In case of urgency, you will be much agitated by the unavailability even though you double the fare. 

It's said that ["time and tide wait for no man"](https://dictionary.cambridge.org/dictionary/english/time-and-tide-wait-for-no-man) and ["The gods send nuts to those who have no teeth"](https://www.oxfordreference.com/display/10.1093/acref/9780199539536.001.0001/acref-9780199539536-e-921). At a certain point, any further physical or mental exertion render a fruitless naught, i will say it's a matter of time, it's a matter of chance... 


### I. Introduction
With the arrival of [Next.js 13.4](https://nextjs.org/blog/next-13-4), two of the most appealing features are **App Router** and **Server Action**. 
- App Router enables the routing defined by the hierarchy of your folders within the app directory. 
- Server Action enables client-side javascript calling functions on server directly without needing to create an API layer in-between. 


### II. Fundamentals
The official documentation of NextJS is awesome. Instead of beating around brushes. Here it comes the ten commandments:

- NextJS, which is based on NodeJS and ReactJS, bears characteristic of both worlds.
- By dint of [JSX](https://legacy.reactjs.org/docs/introducing-jsx.html) syntax, it evades utilization of [Template Engines](https://www.tutorialsteacher.com/nodejs/template-engines-for-nodejs) to produce the final HTML.
- App Router maps URL to folder structure for simple page routing. 
- App Router provides dynamic routing mechanism for implementing REST API. 
- [page.js, loading.js, not-found.js, error.js, route.js](https://nextjs.org/docs/app/api-reference/file-conventions) have *semantic* meanings inside a folder. 
- Owning to security reasons, all code are *server-first*. 
- By inserting a **"use client"** or **"use server"** in the topmost position of a file or inside function definition. You evince the intention of behaviour change.
- A client side component can NOT invoke server side function DIRECTLY.
- A client side component can invoke server side function which is passed down from server component which imports from other server side component. (more on this in next section)
- As you may know, NextJS needs a build step.


next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
```


### III. API Server


### IV. App Server


### V. Deploy with [PM2](https://pm2.keymetrics.io/)

### VI. Deploy with [Docker](https://www.docker.com/)


### VII. Deploy with [render.com](https://render.com/)


### VIII. Summary 
[Calling an ASP.NET C# Method (Web Method) Using JavaScript](https://www.c-sharpcorner.com/UploadFile/abhikumarvatsa/calling-an-Asp-Net-C-Sharp-method-web-method-using-javascript/)


### IX. Reference
1. [Server Actions: NextJS 13.4's Best New Feature](https://youtu.be/czvSZqnpTHs)
2. [Next.js Server Actions in 15 min](https://youtu.be/g1dwTNxGmFQ)
3. [Step-by-Step Guide: Create a Next.js 13 CRUD App with MongoDB from Scratch](https://youtu.be/wNWyMsrpbz0)
4. [NEXTjs Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions)
5. [NEXTjs | Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)
6. [How to enable cors in Nextjs 13 Route Handlers](https://github.com/vercel/next.js/discussions/47933)
7. [How to Deploy Nextjs Web Application with PM2](https://dykraf.com/blog/deploying-nextjs-web-application-with-pm2)
8. [With Docker - Multiple Deployment Environments](https://github.com/vercel/next.js/tree/canary/examples/with-docker-multi-env)
9. [Deploy a Next.js App](https://render.com/docs/deploy-nextjs-app)
10. [The Purloined Letter](https://poemuseum.org/the-purloined-letter/)


### Epilogue 
```
```


### EOF (2023/06/30)
