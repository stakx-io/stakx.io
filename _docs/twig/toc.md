---
since: 0.1.3
summary: The `toc` filter is stakx's method of generating a table of contents (TOC) for any HTML.
parameters:
  -
    name: html
    type: string
    default: ~
    description: The HTML from which to generate a TOC from
  -
    name: id
    type: string
    default: "null"
    description: The ID to assign to the generated TOC
  -
    name: class
    type: string
    default: "null"
    description: The class(es) to assign to the generated TOC
  -
    name: hMin
    type: int
    default: 1
    description: The minimum heading to use. A heading lower than this value would be ignored
  -
    name: hMax
    type: int
    default: 6
    description: The maximum heading to use. A heading greater than this value would be ignored
---

{% import '_includes/callouts.html.twig' as callouts %}

stakx's markdown engine does not have an equivalent of kramdown's `{:toc}`, for good reason. While `{:toc}` may be useful, it restricts users with a lack of configuration options and the placement of the generated table often cannot be put in a semantically correct location. For this reason, the same functionality is provided in stakx as a Twig filter instead.

{{ callouts.tip(
    'Use correct headings',
    "When writing your documents, be sure to use correct headings and do not use headings simple to change font size. If you're using a heading 2 (`##`), the next sub heading, if any, should be a heading 3 (`###`). Using incorrect headings will cause a broken TOC to be generated."
) }}

Given the following markdown,

```markdown
# Heading 1

Lorem ipsum...

## Sub Heading 1

Toast with cheese...

## Sub Heading 2

Hello world...
```

In [dynamic PageViews]({{ url(collections.docs.pageviews) }}#dynamic-pageviews), the generated markdown is accessible through `{% raw %}{{ this.content }}{% endraw %}` and this value is what is passed to the `toc` filter; as seen in the following example:

```twig
{% raw -%}
{{ this.content | toc }}
{% endraw %}
```

{{ callouts.warning(
    '`hMin` Behavior',
    "In the above markdown, if you set `hMin` to `2`, then it'll generate a TOC with only \"Sub Heading 1\" and \"Sub Heading 2\". However, if there was another heading 1 in that markdown document and `hMin` were set to `2`, a broken TOC would be generated; this is intended behavior and not a bug."
) }}
