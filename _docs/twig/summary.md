---
since: 0.1.0
summary: The `summary` filter will extract the first X paragraphs from the given text.
parameters:
  -
    name: paragraphCount
    type: int
    default: 1
    description: The amount of paragraphs used to in the summary.
---

When writing a blog, there's likely to be a page listing all of the blog posts and the first paragraph summarizing the post.

```twig
{% raw -%}
{% for post in collections.posts %}
    <article>
        <p><strong>{{ post.title }}</strong></p>
        <div>
            {{ post.content | summary }}
        </div>
    </article>
{% endfor %}
{% endraw %}
```
