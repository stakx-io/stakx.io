# stakx.io Website

The stakx source for the [stakx.io](https://stakx.io) website.

## Building

This website is made of two separate parts, the actual stakx website and then all of the assets (such as stylesheets). Building the assets is the first step and then use stakx to build the actual website.

- Install [yarn](https://yarnpkg.com/en/docs/install)
- Download the latest version of [stakx](https://github.com/stakx-io/stakx/releases)

```bash
# Build our assets
cd _themes/corcra
yarn
node_modules/.bin/bower-installer
gulp dist

# Compile our website
cd ../../
stakx build
```
