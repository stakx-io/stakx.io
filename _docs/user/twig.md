---
title: Twig
category: documentation
---

{% import '_includes/callouts.html.twig' as callouts %}

stakx uses the [Twig template engine](https://twig.symfony.com/) for all of its PageViews as well as ContentItems. If you're coming from templating languages such as Liquid, you'll feel right at home and wonder *why* Liquid doesn't have such awesome features.

Due to stakx's lack of an API, support for adding another template engine is not possible at the moment. Support for new template engines will become available through the use of plug-ins.

{{ callouts.tip(
  'Twig Inside ContentItems',
  'Twig is rendered **before** the respective language in ContentItems. For example, you may have Twig generate a markdown list that will be rendered by the markdown engine after.'
) }}

## Designing PageViews

Whether you're right a layout, ContentItem, or PageView, all of the Front Matter will always be flattened and accessible through the special `this` variable inside of Twig.

In order to access information regarding your site, here are some predefined variables defined and available in all PageViews and ContentItems.

| Name | Description |
| ------------- | ----------- |
| `site` | The `config.yml` as an array |
| `collections` | A multi-dimensional array of ContentItems grouped into their respective collection. The key of the array is the name of the collection. |
| `data` | A multi-dimensional array of DataItems and Datasets |
| `menu` | A nested array of static PageViews of what the navigation menu would look like. |
| `pages` | An array of all the static PageViews availabe in the site |
| `this` | The Front Matter for the current ContentItem or PageView |

## Custom Twig Filters

stakx supports all [built-in Twig functions and filters](https://twig.symfony.com/doc/1.x/) and in addition, some custom functions and filters are provided by stakx for convenience and to introduce new features.

{% for f in collections['twig-filters'] | order('basename') %}
- [{{ f.basename }}]({{ url(f) }})
{% endfor %}
