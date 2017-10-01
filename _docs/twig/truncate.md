---
since: 0.1.0
summary: The `truncate` filter will cut off a string after a limit is reached.
parameters:
  -
    name: length
    type: int
    default: 30
    description: The amount of characters to truncate a string to
  -
    name: preserve
    type: bool
    default: "false"
    description: When set to true, the last word will be preserved
  -
    name: separator
    type: string
    default: "'...'"
    description: The set of character(s) that will be appended to the truncated string
---

Here's some sample usage.

```twig
{% raw -%}
<!-- "Hello..." -->
{{ "Hello World!" | truncate(5) }}

<!-- "Hello World!" -->
{{ "Hello World!" | truncate(7, true) }}

<!-- "Hello W??" -->
{{ "Hello World!" | truncate(7, false, '??') }}
{% endraw %}
```
