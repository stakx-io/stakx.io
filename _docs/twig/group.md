---
since: 0.1.0
summary: The `group` filter will group an array of associative arrays or built-in stakx objects based on a given key
parameters:
  -
    name: sortKey
    type: string
    default: ~
    description: The key to group by
---

This can be useful when grouping Content Items based on a category or author. Given a multi-author site as an example, each post's front matter would look like so:

```yaml
---
title: My Amazing Post 1
author: allejo
---
```

Using the `group` filter will allow you group posts based on the author.

```twig
{% raw -%}
<!--
  [
    'allejo' => [...],
    'wombat' => [...]
  ]
-->
{{ collections.posts | group('author') }}
{% endraw %}
```
