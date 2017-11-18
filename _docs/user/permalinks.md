---
title: Permalinks
category: documentation
---

{% import '_includes/callouts.html.twig' as callouts %}

The permalinks for your pages are set in PageViews through the `permalink` Front Matter key. When this key is a string or an array of a single string, then that will behave as the permalink for that PageView.

Unlike other tools, permalinks can **only** be defined in PageViews. This is by design in order to force permalinks to be defined in one standard location instead of having to guess where they be defined.

The default behavior of stakx is that all generated URLs will be sanitized and converted to lowercase automatically, for example:

```yaml
---
permalink: /My Super Awesome First Page!/
#          /my-super-awesome-first-page/
---
```

## URL Redirects

If the `permalink` key is set to an array of strings, then the first link will be the canonical link for that PageView but the rest of the permalinks will be created as redirects. In the following example, both the `/about-me/` and `/life-story/` URLs will redirect to `/about/`.

```yaml
---
permalink:
    - /about/
    - /about-me/
    - /life-story/
---
```

### Redirecting from a ContentItem

The need for creating redirects for specific ContentItems whether it's to have a short URL for easy access or the permalink just needs to be changed. In order to achieve this, use the `redirect_from` Front Matter key in your ContentItem and a redirect will be created for that specific ContentItem.

```yaml
redirect_from:
  - /blog/my-old-article-title/
```

{{ callouts.note(
  'ContentItems Exclusive',
  "This key is only respected when inside a ContentItem's Front Matter and will not have an affect in PageViews."
) }}


## Case Sensitivity

By default, stakx will convert permalinks to lowercase when generating the output files. This value is set in the site configuration file and can be overwritten in your own `config.yml`.

```yaml
build:
    preserveCase: false
```

By changing this value to `true`, your permalinks will preserve the case it is given but will continue to be sanitized. For example,

```yaml
---
permalink: /My Super aWesome First Page!/
#          /My-Super-aWesome-First-Page/
---
```

{{ callouts.warning(
  'Site-wide Setting',
  'This is a site-wide setting and cannot be set on a per page basis; it will affect all generated content.'
) }}
