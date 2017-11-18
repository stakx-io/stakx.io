---
title: Front Matter
category: documentation
---

{% import '_includes/callouts.html.twig' as callouts %}

All PageViews and ContentItems in stakx begin with Front Matter at the top of the file surrounded by a set of three dashes. In between the dashes, use [YAML](http://yaml.org/) to define information relating to the respective document. Here's an example of what it looks like:

```yaml
---
title: My First Stakx Blog Post
date: 2017-01-12
---
```

You may define any variables you'd like in your Front Matter and they will be accessible in the Twig template as a child to the `this` variable. With the example above, you would access the title of your blog post by using `{% raw %}{{ this.title }}{% endraw %}` in your Twig template.

{{ callouts.warning(
    'Reserved keys', 
    "There are certain Front Matter keys that are reserved or have special behavior so be sure you're using them as intended ([see below](#special-front-matter-keys))."
) }}

## Variables in Front Matter

In addition to Front Matter serving variables for your Twig templates, Front Matter can also serve variables for itself. Basic substitution is available in Front Matter by using a `%` before the name of the Front Matter key. The order in which the variables are called does not matter, meaning you may use them before they're even defined (useful for dynamic or repeater PageViews); however if you call a variable that is not defined, an error will be thrown.

Front Matter variables are especially useful for defining permalinks for dynamic and repeater PageViews.

```yaml
---
fullName: %firstName %lastName
firstName: Scott
lastName: Pilgrim
permalink: /authors/%fullName/ # /authors/scott-pilgrim/
---
```

Variables in Front Matter only support letters for variable names, so using `%some_var_name` would be treated as calling the `%some` variable and appending the string `_var_name` to that value.

{{ callouts.tip(
    'Escaping the %', 
    "If you need to use the `%` symbol as a value for a percentage, you will need to escape it with a backslash (i.e. `\%`)."
) }}

##  Special Front Matter Keys

As mentioned before, there are certain Front Matter keys that have special behavior or are reserved. Reserved keys will be set automatically by stakx and cannot be overwritten.

### Values with special behavior

| Key | Description |
| :-: | :---------- |
| `title` | Plays a special role in a lot of objects in stakx. For example, static PageViews are indexed by the `title` value when accessed from the `pages` Twig variable. |
| `date` | If a ContentItem or a PageView has a `date` key (and it contains a valid date), then it will automatically be parsed into a DateTime object and the following new Front Matter keys will automatically be created: <br><br> `year`, `month`, `day` |
| `menu` | When set to `false` in a static PageView, the page is excluded from the site's menu. |
| `collection` <br> `dataset` | These keys are reserved for defining [Dynamic PageViews]({{ url(collections.docs['pageviews']) }}#dynamic-pageviews).
| `permalink` | This key defines the URL that a given [PageView]({{ url(collections.docs['pageviews']) }}) will use |

{{ callouts.tip(
    'Dates respect timezones',
    "The dates parsed will respect the timezone set in your `php.ini` **unless** a timezone is explicitly defined in the timestamp provided."
)}}

### Reserved Keys

Here's a list of keys that should never be set manually in a document because they are created automatically or their values will be overwritten in your Twig template.

| Key | Description |
| :-: | :---------- |
| `iterators` | This value is set in Repeater PageViews. |
| `filename` | Stores the filename of the given document with the extension. |
| `basename` | Stores the filename without the extension. |
| `year`, `month` <br> `day` | Created automatically when a `date` key is present. |
