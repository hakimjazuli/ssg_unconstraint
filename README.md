# ssg_unconstraint

## status

-   test passed;

## how to use

-   after installing

```shell
node i @html_first/ssg_unconstraint
node ./node_modules/@html_first/ssg_unconstraint/starter.mjs

```

-   look for **"./h_client_example/index.mjs"**, it's your entry point
-   build it your favourite packager
-   then use it on your html

## how to use your class on html

our package use template for calling the registered class

```html
<div client c-1="alpine;if;toggle_me">open</div>
```

means :

-   call class named alpine,
-   call method named if,
-   input toggle_me as first argument,

**pattern:** add attribute on the element

-   client;
-   c[dash]**index**="**class_name**[vars.delimiter[0]]**method**[vars.delimiter[0]]**...arguments**"
