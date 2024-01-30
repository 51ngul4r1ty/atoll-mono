Overview
========

This project was set up using a combination of Manuel Bieh's template, Create
React App and other references mentioned in this doc.

The [History Setup](History-Setup.md) document contains further detailed
steps performed.

The [Log](Log.md) document contains miscellaneous information that would
clutter this file, but may still have some relevance, so you can also look
there for additional historical info.

Chronological History
=====================

1. Project set up using a combination of Manuel Bieh's template [ [*1](#ref-1)
  ], Create React App and other references [ [*2](#ref-2), [*3](ref-3),
  [*4](ref-4) ].
2. After working with the project for a while Atom Design was adopted for the
  component library (see "Atomic Design" below [ [*5](#ref-5) ]).
3. When building various components these references were used [ [*6](#ref-6),
  [*7](#ref-7) ]
4. On September 23, 2022, the project moved to a monorepo using npm workspaces.
  [ [*8](#ref-8) ]

References
==========

<a id="ref-1"></a>
[*1] [Manuel Bieh's React SSR Setup Project](
    https://github.com/manuelbieh/react-ssr-setup)

<a id="ref-2"></a>
[*2] [Debug Browser Code in VSCode](
    https://vcfvct.wordpress.com/2019/01/11/debug-browser-code-in-vscode/)

<a id="ref-3"></a>
[*3] [Data Fetching in Redux Apps: A 100% Correct Approach](
    https://bit.ly/ref-data-fetching-in-redux/)

_This very opinionated article (by title) provided the basis for rolling our own
redux-api-middleware.  Why didn't we just use `redux-api-middleware`?  It didn't
work with SSR!  So, back to the drawing board and, using the article below, we
created something quite similar to redux-api-middleware that was SSR compatible.
Note: there is another project out there that claims to do the same but we
weren't able to get it to work, and the effort involved to "roll our own" wasn't
significant._

<a id="ref-4"></a>
[*4] [How to use Sequelize with Node and Express](
    https://bit.ly/sequelize-with-express/)


<a id="ref-5"></a>
[*5] [A Quick Overview of Atomic Design Terminology](
    https://www.youtube.com/watch?v=aMtnGeiWTyU)

<a id="ref-6"></a>
[*6] [How to Build the Checkbox](
    https://bit.ly/ref-custom-checkboxes/)

<a id="ref-7"></a>
[*7] [How to Compare oldValues and newValues on React Hooks useEffect](
    https://bit.ly/ref-compare-old-new-useeffect/)

<a id="ref-8"></a>
[*8] [Create a Monorepo with NPM Workspaces](
    https://franciscogonzalez.dev/blog/monorepo-with-npm-workspaces
