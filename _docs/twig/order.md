---
since: 0.1.0
summary: The `order` filter will sort an array of associative arrays or stakx objects based on a key
parameters:
  -
    name: key
    type: string
    default: ~
    description: The key to sort by
  -
    name: order
    type: string
    default: "'ASC'"
    description: "'ASC' or 'DESC'"
---

In a blog, displaying posts in reverse chronological order is the accepted practice. Using the `order` filter lets you achieve this.

```twig
{% raw -%}
{% for post in collections.posts | order('date', 'DESC') %}
  <article>
    <h1>{{ post.title }}</h1>

    <!-- ... -->
  </article>
{% endfor %}
{% endraw %}
```
