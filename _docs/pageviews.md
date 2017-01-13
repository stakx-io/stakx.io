---
title: PageViews
category: documentation
---

stakx is designed to behave like the "controller" of an MVC framework meaning all logic on how your content and data is displayed within your website is left up to PageViews. This means that extending layouts is left up to the Twig in your PageViews using `{% raw %}{% extends %}{% endraw%}` and not to a `layout` key in Front Matter, for example.

Because the default stakx configuration is designed to have the bare minimum, the location of where your PageViews will be stored is up to you. Define the `pageviews` value in your `_config.yml` and have an array of where your PageViews will be stored; a general practice would be to use a `_pages` folder to house all of them but you may define as many as you like.

```yaml
pageviews:
  - _pages
```

## Static PageViews

## Dynamic PageViews

## Repeater PageViews
