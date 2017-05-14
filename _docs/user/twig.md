---
title: Twig
category: documentation
---

stakx supports all [built-in Twig functions and filters](https://twig.sensiolabs.org/doc/1.x/) and in addition, some custom functions and filters are provided by stakx for convenience and to introduce new features.

{% for f in collections['twig-filters'] %}
- [{{ f.basename }}]({{ url(f.permalink) }})
{% endfor %}