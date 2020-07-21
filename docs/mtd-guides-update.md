---
id: mtd-guides-update
title: Updating your data
---

*These guides assume you are comfortable with the [Command Line](https://en.wikipedia.org/wiki/Command-line_interface), [Git](https://en.wikipedia.org/wiki/Git), [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) and [NPM](https://en.wikipedia.org/wiki/Npm_(software)). You must have all of these installed on your machine. You are also strongly encouraged to have a [GitHub](https://github.com) account. You are encouraged to fork or clone the [Mother Tongues Dictionary Starter](https://github.com/roedoejet/mtd-starter) and follow along.*

Once you have [prepared your configuration files](mtd-guides-prepare) and chosen and set up a [User Interface](mtd-guides-ui) to visualize your data, updating is done by compiling and exporting your data.

1. From your [MTD folder](mtd-guides-prepare#file-structure), run `mtd export . js .`
2. Move the resulting exported data to the relevant path of your [chosen UI](mtd-guides-ui)
3. Follow the steps for [building and publishing](mtd-guides-publishing) your chosen User Interface 