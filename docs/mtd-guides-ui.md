---
id: mtd-guides-ui
title: Visualizing your data
---

### Adding a User Interface

This is an advanced guide for adding your dictionary files to a User
Interface.

#### Export

First, you need to export the JavaScript files required by any MTD UI.

1.  Change directories to your [MTD folder](#file-structure).
2.  Then, build the dictionary using the `mtd export` command to create
    necessary JavaScript files. For example, given a dictionary named
    `abc`, a Language configuration file named `abc_config.json`, and a
    desired output folder `output`, run the following:

`mtd export abc_config.json js output`

Because we are in our MTD folder, we can just run `mtd export . js .`

You will see various messages displayed, potentially including info,
warnings, and errors, which are ordered in terms of severity. If there
are only info messages, the command executed successfully, and the info
might advise you on how to improve your configuration inputs. If there
are warnings (which may be in addition to info messages), the command
executed but there might be serious issues with the output files. If
there are errors (which may be in addition to info messages and
warnings), the command did not execute successfully.

Checking your output folder, you should see two files: `config-abc.js`
and `dict_cached-abc.js`. These files contain the data for your
dictionary.

Once you have built your dictionary files, you can add them to a
dictionary UI such as an [MTD
UI](https://github.com/roedoejet/mothertongues-ui). As a simple example,
you can make a functioning dictionary website by downloading the
mothertongues-UI repository and extracting the files to your computer.
Once complete, copy the two files outputed by the `mtd export` function
to the following location in your Mothertongues-UI:

`mothertongues-UI-master/src/assets/js`

::: {.note}
::: {.title}
Note
:::

Default files named `config.js` and dict\_cached.js\`\` should already
exist. You must overwrite these files with the ones you have just
exported. Note that these files already exist, and contain a set of
sample entries. You should overwrite these files with your dictionary
data files.
:::

If you are using the default mobile MTD UI, you can then install all
dependencies (`npm install`) and run the app (`ionic serve`).
