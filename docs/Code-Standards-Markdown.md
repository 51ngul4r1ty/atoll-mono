Overview
========

Although not technically "code" markdown documents should comply to the set of
guidelines in this document.

Layout
======

In general, markdown files should have an "Overview" section that explains the
document's purpose and introduces the content to the reader so that they do not
need to read further.  It may also refer the reader to other related documents.

The end of the document can have a "References" section that explains the origin
of some of the content within the document.

Sections should be spaced out by a single blank line at the top and bottom of
the section.

Headings
========

Although prettier formats headings with the hash (UK) or pound (US) characters
as in `# Heading 1` and `## Heading 2` the markdown files in this repo should
use `====` and `----` for the full length of the words used in the headings.
This allows markdown files to be read more easily without a markdown preview
tool.

Try to avoid using a level 1 heading at the top of a file that matches the file
name description and then proceed to use level 2 headings throughout the file.
Some repos may do this, but this repo should have many top level headings with
sections for further detail below them.

Try to avoid going below heading level 3 (i.e. do not use `####`) because they
often cannot be differentiated from regular paragraph text.

Line Length
===========

Although code in this repo abides by the 132 line length limit, markdown files
should use the 80 character limit.  The reasoning for this is a practical one:
markdown files are sometimes used for reference and they can be placed next to
code in the text editor without worrying about line wrapping.  Once again, this
is so that a markdown preview tool is not required.

If you need to break a document link up you should do it after the left
parethesis, for example,  
  `[SOME_DOC_LINK_THAT_IS_TOO_LONG_TO_FIT_ON_ONE_LINE.md](` <-- line break here  
  `··[SOME_DOC_LINK_THAT_IS_TOO_LONG_TO_FIT_ON_ONE_LINE.md])`

Special Characters
==================

In order to show space characters (for indentation) you can use `·`.

Two Spaces After Periods
========================

This is a controversial topic for people who may not be aware of the reason
behind the use-one-space-after-a-period movement.  When using monospace fonts
spacing is the same for all characters so that necessitates clearer separation
of sentences.  Obviously when using a font that's typically used in publishing
(either in print or online) the extra space isn't needed.  The audience for
these documents is typically using a monospace font in their editor- unless they
view the markdown document in a preview tool.  So, using 2 spaces allows both
viewing methods to be supported.

Recently this has also been shown to improve reading speed:
https://link.springer.com/article/10.3758/s13414-018-1527-6

External Links
==============

When linking to offsite pages make sure that the links do not exceed the line
width limit of 80 characters.  Sometimes it just isn't possible to achieve this
unless you use a url-shortening service.  Please use bit.ly for this purpose and
use a link name that's short but descriptive enough for the user to understand
what they will see when clicking the link, for example an article titled
_"Data Fetching in Redux Apps: A 100% Correct Approach"_ has this link:
`https://bit.ly/ref-data-fetching-in-redux`

References
==========

Unlike external links that are typically in-line it may be convenient to provide
anchor links that reference a link with description at the end of the document.

In this case, use `[*n](#ref-n)` to reference the link in a `References` section
at the bottom of the document.  In that section you'll then have a
`<a id="ref-n"></a>` anchor above the line with the reference link formatted as
follows:
`[*n] [Link Text That Reader Sees in HTML Preview](https://link-url.com/)`
Each reference should have a unique number in sequence in the document.  If you
insert a reference out of sequence please renumber the other references.  If it
is necessary to have a long description of this reference it should be formatted
as italics below the reference row shown above.

Markdown Styling
================

* Use _italics_ when referring to an article name or when providing emphasis for
  similar items.
* Use `backticks` for URLs you wish to reveal without making them clickable or
  for something code related.
* Use **bold** for highlighting an important part of a sentence- think of this
  as a way to draw a reader's attention as a quick summary that will allow them
  to quickly find information they're looking for.
* Refer to the "Headings" section above for heading-specific styling.

Images
======

Make sure to commit an image to the repo under a `docs/images` folder (may not
exist yet) and reference it.
