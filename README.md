# ssg_unconstraint

## DESC

have you bought Static Site Generator software? like:

-   **bootstrap studio**,
-   **pinegrow**,
-   **wysiwyg web builder**,
-   or bassicall any closed source SSG software,

there are times they also provide service to publish your litle to unprocessed site directly in
their UI. altough convenient, there are some scenario, that your generator only support their own
template, and doesn't allow total control of your html element. and event thought they might provide
way to do like custom component, you have to often to opt out from its basic (the WYSIWYG part)
convenient.

-   **IF** you want to use frontend library/framework that their main instructions is placed in
    attributes to elements.
-   **AND IF** your only (convinient) way is to mitigate it in the client run time,
-   **IF** you want to to **unconstrain** your ssg in client browser...

then this library is for you...

## how to use

-   after installing

```shell
node i @html_first/ssg_unconstraint
node ./node_modules/@html_first/ssg_unconstraint/starter.mjs

```

-   look for **"./client/index.mjs"**, it's your entry point
-   build it your favourite packager
    > -   **OR** use our bundle helper setting `rollup.config.mjs`

```js
// @ts-check

import { _RollupSettings, _RollupTarget } from '@html_first/atla-as_builder';

const targets = [new _RollupTarget('bundle', '/client/html_first/index.mjs', `./`)];

export default new _RollupSettings(targets).config;
```

-   > -   then save on your `package.json` to run
    >     > -   `rollup -c` for build script or,
    >     > -   `rollup -c -w` for build with watch;

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

## HOW this library works

on runtime, it register mutation observer that detects, attribute 'client' on the mutation list...
so if you want to call our class in runtime by manually adding attribute to an element, you better
adding _c-index_ first then... the _client_,

or if you are working on the classes scope you can use our provided static function

-   **class_instance**.set_c_next(...**arguments**);
-   **arguments** are following our **pattern**: arg_1: **class_name**, arg_2: **method**, ...arg_3
    **...arguments**

## version info

-   **1.0.xx** past test
-   **1.1.xx** added optional helper to global scope to set and intiate required "c-index" and
    "client" to element
