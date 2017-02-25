---
title: Front Matter
category: documentation
---

All PageViews and ContentItems in stakx begin with Front Matter at the top of file surrounded by a set of three dashes. In between the dashes, use [YAML](http://yaml.org/) to define information relating to the respective document. Here's an example of what it looks like:

```yaml
---
title: My First Stakx Blog Post
date: 2017-01-12
---
```

You may define any variables you'd like in your Front Matter and they will be accessible in the Twig template as a child to the `this` variable. With the example above, you would access the title of your blog post by using `{% raw %}{{ this.title }}{% endraw %}` in your Twig template.

> **Warning:** There are certain Front Matter keys that are reserved or have special behavior so be sure you're using them as intended ([see below](#special-front-matter-keys)).

## Variables in Front Matter

In addition to Front Matter serving as a variable for your Twig templates, Front Matter can also serve as variables to itself. Basic substitution is available in Front Matter by using a `%` before the name of the Front Matter key. The order of when the variables are called does not matter, meaning you may use them before they're even defined (useful for dynamic or repeater PageViews); however if you call a variable that is not defined, an error will be thrown.

Front Matter variables are especially useful for defining permalinks for dyanmic and repeater PageViews.

```yaml
---
fullName: %firstName %lastName
firstName: Scott
lastName: Pilgrim
permalink: /authors/%fullName/ # /authors/scott-pilgrim/
---
```

Variables in Front Matter only support letters for variable names, so using `%some_var_name` would be treated as calling the `%some` variable and appending the string `_var_name` to that value.

If you need to use the `%` symbol as a value for a perctange, you will need to escape it with a backslash (i.e. `\%`).

##  Special Front Matter Keys

As mentioned before, there are certain Front Matter keys that have special behavior or should not be used.

### `title`

The `title` key is reserved for naming static PageViews and is how they're referenced in the global `pages` Twig variable.

### `date`, `year`, `month`, `day`

If a ContentItem or a PageView has a `date` key, then it will automatically be parsed into a DateTime object and the following new Front Matter keys will be created and set:

- `year`
- `month`
- `day`

The dates parsed will respect the timezone set in your `php.ini` **unless** a timezone is explicitly defined in the timestamp provided.

### `menu`

When the `menu` key is set to `false` in a static PageView, then the page is excluded from the site's menu.

### `collection`

The `collection` key is reserved for defining [Dynamic PageViews](#).

### `permalink`

The `permalink` key has special behavior when used in the Front Matter of a PageView. When this key is a string or an array of a single string, then that will behave as the permalink for that PageView. All generated URLs will be sanitized and converted to lowercase automatically, for example:

```yaml
---
permalink: /My Super Awesome First Page!/
#          /my-super-awesome-first-page/
---
```

If the `permalink` key is set to an array of strings, then the first link will be the redirect for that PageView but the rest of the permalinks will be created as redirects to the actual permalink. In the following example, both the `/about-me/` and `/life-story/` URLs will be created as redirects to the `/about/` URL.

```yaml
---
permalink:
    - /about/
    - /about-me/
    - /life-story/
---
```

### `menu`

The `menu` key is a boolean that when set to false, will result in a static PageView from not appearing in the `menu` variable typically used to build the site's menu.

### `iterators`

The `iterators` Front Matter key should be never be set manually and instead is only available in Repeater PageViews.
