# fuze-boilerplate

This is a demonstration of extending a legacy app developed with an "old" framework (in this example, angularJS) with new modules created in modern frameworks.

This tutorial will show how to use the micro-frontends approach to extend a large-scale application with new features developed in new standards, with minimal integration effort and no need to rewrite the whole application.

This enables developers and project managers to reduce cost and effort over time under the heavy dome of the "javascript fatigue".

We should focus on feature development, not feature rewrite.

In the following demo we will use `microfronts` as the supporting library for orchestrating multiple front-ends and `lerna` as our task runner. The project's folder structure in this example will be `mono-repo` style, as this is not mandatory - it is easier to work with.

Read more here:
- [lerna](https://lerna.js.org/)
- [microfronts](https://github.com/eavichay/microfronts)

#usetheplatform

## Step 1
Place the legacy application under "packages".
For the example we will take our "legacy" application from the RealWorldApp project's angularJS implementation (https://github.com/gothinkster/angularjs-realworld-example-app).
- `cd packages/conduit`
- `git clone git@github.com:gothinkster/angularjs-realworld-example-app.git .`

## Step 2
Create the shell application and orchestrate the legacy app to work as-is.
- `cd packages/shell`
- create `src/index.html` file with simple html structure
- create and empty `src/index.js`
- embed the `src/index.js` file into the `src/index.html` file.

## Step 3
Add a new module under a new url route, created in a different framework.
- `cd packages/todos`
- create a react boilerplate app. For the example we will use `create-react-app`

## Step 4
Integrate between the modules to work as one.

## Step 5...
Add more modules with different frameworks.

## Extended topics (TDB):
- Sharing common code at runtime
- Sharing assets (3rd party code, stylesheets, images, fonts, etc.)
- Uniform build and deployment