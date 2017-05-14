---
since: 0.1.0
summary: |
  The `where` filter allows you to filter elements/objects in an array based on the value the specified key contains.

  | Operator | Description |
  | :--: | :--- |
  | `==` | Ensure the values are equal **and** are the same data type |
  | `!=` | Ensure the values are not equal; returns false if the values are the same but different data types |
  | `>`  | Greater than |
  | `>=` | Greater than or equal to |
  | `<`  | Less than |
  | `<=` | Less than or equal to |
  | `~=` | Check if a string or array contains the `<value>`; case-sensitive |
  | `_=` | Check if a string or array contains the `<value>`; case-insensitive |
  | `/=` | Compare the `<value>` with a regular expression |
parameters:
  -
    name: key
    type: string
    default: ~
    description: The key name we'll be comparing
  -
    name: comparison
    type: string
    default: ~
    description: "The available comparisons: `==`, `!=`, `>`, `>=`, `<`, `<=`, `~=`, `_=`, `/=`"
  -
    name: value
    type: mixed
    default: ~
    description: The value we are searching for
---

```twig{% raw %}
{% set users = [
  { 'username': 'allejo', 'rank': 'admin', 'id': 1 },
  { 'username': 'alezakos', 'rank': 'admin', 'id': 2 },
  { 'username': 'the_map', 'rank': 'user', 'id': 3 }
] %}

<!-- [ 
  { 'username': 'allejo', 'rank': 'admin', 'id': 1 },
  { 'username': 'alezakos', 'rank': 'admin', 'id': 2 }
] -->
{% set filtered = users | where('rank', '==', 'admin') %}
{% endraw %}
```