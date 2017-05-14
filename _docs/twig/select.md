---
since: 0.1.1
changelog:
  - since: 0.1.2
    note: The `ignore_null` argument was added
summary: The `select` filter allows you to pick out values from an array of associative arrays or built-in stakx objects such as ContentItems and DataItems.
parameters:
  -
    name: key
    type: string
    default: ~
    description: The associative key that we'll be picking values from.
  -
    name: flatten
    type: bool
    default: "true"
    description: Whether or not to flatten multi-dimensional arrays into a single array.
  -
    name: distinct
    type: bool
    default: "true"
    description: Whether or not to remove duplicate items from the flattened array. This is only available when `flatten` is set to true.
  -
    name: ignore_null
    type: bool
    default: "true"
    description: Whether or not to include null values in the returned array.
---

From an array of objects, each with a `username` value, I can use the `select` filter to pull the unique values in each of those fields.

```twig
{% raw -%}
{% set object_array = [{ 'username': 'allejo' }, { 'username': 'immortalwombat' }] %}

<!-- ['allejo', 'immortalwombat'] -->
{{ object_array | select('username') }}
{% endraw %}
```

Or if I would like to get all of the distinct tags used in all of my posts that I've written in a blog.

```twig
{% raw -%}
{{ collections.posts | select('tags') }}
{% endraw %}
```
