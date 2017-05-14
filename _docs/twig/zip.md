---
since: 0.1.2
summary: The `zip` filter allows you to concat each of the elements in two arrays together with a specified glue.
parameters:
  -
    name: arr
    type: array
    default: ~
    description: The second array we'll be zipping together.
  -
    name: glue
    type: string
    default: '""'
    description: The character(s) used to "zip" the two values together.
  -
    name: strict
    type: bool
    default: "false"
    description: When set to true, only the amount of elements of the shortest array will be used. Any extra elements on either array will not be zipped together.
---

```twig
{% raw -%}
{% set array_1 = ['hello', "it's", 'to', 'you'] %}
{% set array_2 = ['world', 'nice', 'meet'] %}

<!-- ['hello world', "it's nice", 'to meet', 'you'] -->
{{ array_1 | zip(array_2, ' ') }}

<!-- ['hello world', "it's nice", 'to meet'] -->
{{ array_1 | zip(array_2, ' ', true) }}
{% endraw %}
```
