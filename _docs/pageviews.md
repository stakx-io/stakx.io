---
title: PageViews
category: documentation
---

stakx is designed to behave like the "controller" of an MVC framework meaning all logic on how your content and data is displayed within your website is left up to the most powerful feature, PageViews. This means that extending layouts is left up to the Twig in your PageViews using `{% raw %}{% extends %}{% endraw%}` and not to a `layout` key in Front Matter, for example.

Because the default stakx configuration is designed to have the bare minimum, the location of where your PageViews will be stored is up to you. Define the `pageviews` value in your `_config.yml` and have an array of where your PageViews will be stored; as a convention, use a `_pages` folder to house all of them but you may define as many as you like.

```yaml
pageviews:
  - _pages
```

## Static PageViews

The static PageView is the default type and should be used for your average page that already has contents in it and does not need to be used as a template for other pages (this should not be confused with Twig's extend functionality).

An example for the use of a static PageView is a contact page where it may extend a Twig template but the body of the PageView will not be used in any of the other pages.

## Dynamic PageViews

In order to define a dynamic PageView, it should have two Front Matter keys defined: `permalink` and `collection`. Dynamic PageViews are used to render pages for ContentItems that belong to a Collection and have special behavior. The `collection` key should be set to the name of the Collection this PageView will be used for.

The special behavior behind dynamic PageViews is that the Front Matter that is defined in the dynamic PageView is flattened along with the individual Front Matter defined of your ContentItems. Here's an example ContentItem and dynamic PageView, respectively:

**_posts/2017-02-01-hello-world.md**

```yaml
---
title: Hello World from stakx
date: 2017-02-01
author: Scott Pilgrim
---

Hello from your first stakx post
```

**_pages/blog/show.html.twig**

```twig
---
collection: posts
permalink: /blog/%title/
---

{% raw %}
<h1>{{ this.title }}</h1>
<article>{{ this.content }}</article>
{% endraw %}
```

The following dynamic PageView will generate a separate page for each ContentItem available in the `posts` Collection. During each iteration of ContentItems, Twig has access to a merged Front Matter between the ContentItem and the PageView, including variables!

Here's the what combined and evaluated Front Matter would look like for the iteration of the blog post in our sample:

```yaml
---
title: Hello World from stakx
date: 2017-02-01
author: Scott Pilgrim
collection: posts
permalink: /blog/hello-world-from-stakx/
---
```

There's no need to define your default values and which layouts to use in the `_config.yml`. The goal is to keep the configuration file is to have global variables and defining where to find content, not how to use it.

## Repeater PageViews

The last PageView type is the repeater PageView allowing you to create multiple files from the same template. In order to create a repeater template, create a Front Matter array and use it as a variable in your `permalink` key; this is called "value expansion."

```yaml
---
categories:
  - announcements
  - life
  - rants
  - uncategorized
permalink: /blog/categories/%categories/
---
```

The above example will generate four separate pages:

- `/blog/categories/announcements/`
- `/blog/categories/life/`
- `/blog/categories/rants/`
- `/blog/categories/uncategorized/`

In your Twig templates, you have access to the special `this.iterators` array that has keys respective to the Front Matter variable and the value of the current iteration for your template. In the above example, `this.iterators.categories` will be set to `announcements` when the `/blog/categories/announcements/` page is being generated and so on.

> **Heads Up!** The "value expansion" feature is only available to the `permalink` Front Matter key; an error will be thrown if used for any other key.

## Permalinks

The `permalink` key has special behavior when used in the Front Matter of a PageView. When this key is a string or an array of a single string, then that will behave as the permalink for that PageView. All generated URLs will be sanitized and converted to lowercase automatically, for example:

```yaml
---
permalink: /My Super Awesome First Page!/
#          /my-super-awesome-first-page/
---
```

If the `permalink` key is set to an array of strings, then the first link will be the canonical link for that PageView but the rest of the permalinks will be created as redirects. In the following example, both the `/about-me/` and `/life-story/` URLs will redirect to `/about/`.

```yaml
---
permalink:
    - /about/
    - /about-me/
    - /life-story/
---
```
