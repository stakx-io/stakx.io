---
since: 0.1.1
changelog:
  - since: 0.1.2
    note: The `absolute` argument was added
summary: The `url` filter is used to generate URLs to stakx object or assets.
parameters:
  -
    name: assetPath
    type: ContentItem | PageView | string
    default: ~
    description: The URL or stakx object to link to
  -
    name: absolute
    type: bool
    default: "false"
    description: When set to true, use the `url` option from the site configuration
---

All URLs linking to stakx pages or assets should always be rendered using the `url` filter; this will allow for easy to maintain URLs by changing a single value in your `_config.yml` file.

The two options in your configuration file that will be used are:

- `url`
- `baseurl`

By setting `absolute` to true, the `url` value in `_config.yml` will be used in the beginning of the returned URL.

Link to a loop of ContentItems.

```twig
{% raw -%}
<ul>
    {% for post in collections.posts %}
        <li>
            <a href="{{ url(post) }}">{{ post.title }}</a>
        </li>
    {% endfor %}
</ul>
{% endraw %}
```

Link to a specific ContentItem.

```twig
{% raw -%}
{{ url(collections.posts['my-blog-post']) }}
{% endraw %}
```

Link to a specific static PageView.

```twig
{% raw -%}
{{ url(pages.News) }}
{% endraw %}
```

Link to an standalone asset.

```twig
{% raw -%}
{{ url('/assets/images/logo.png') }}
{% endraw %}
```
