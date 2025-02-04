---
id: mtd-start
title: Getting Started
---

Overview
--------

### What is Mother Tongues Dictionaries?

Mother Tongues Dictionaries (MTD) is a tool developed to facilitate the
rapid, inexpensive development of digital dictionaries, with a
particular focus on language revitalization of Indigenous languages. For
a primer in understanding some of the motivations behind language
revitalization, see [this
chapter](http://oxfordre.com/linguistics/view/10.1093/acrefore/9780199384655.001.0001/acrefore-9780199384655-e-8)
of the Oxford Research Encyclopedia of Linguistics.

MTD is unique in a number of ways:

1.  Approximate search comes out of the box, and the algorithm can be
    easily customized. See [guides](mtd-guides)
2.  Free & open source. MTD is licensed by AGPL 3.0.
3.  Multiple platforms. MTD has a number of front ends that it is
    compatible with, including for the Web, iOS and Android.

### MTD Structure

You can think of creating a Mother Tongues Dictionary as involving two
distinct parts:

1\. **MTD** - The tool documented here, which is essentially a text
processing tool. It is able to take data for one or more languages from
multiple different sources (spreadsheets, websites, plain text files
etc\...) and combine the data, sort it, index it, find duplicates,
create a 'compare form' to be used by the approximate search
algorithm, and then export it to a number of different formats.

2\. **MTD-UI** - A front-end tool for *visualizing* your dictionary.
Each front end tool must accept two files. The first file is a
"config.js" file which has information about the dictionary including
an alphabet to sort by, the name of the language and other metadata. The
second file is a 'data_cached.js" file which contains all the
lexical (word related) data for the dictionary.

Making a Dictionary
-------------------

To make a dictionary from your data, you need to do the following three
things:

1.  Install mothertongues, see [installation](mtd-installation).
2.  Write a valid Mother Tongues Language configuration file. See
    [guides](mtd-guides)
3.  Write valid Mother Tongues data resource configuration files. See
    [guides](mtd-guides)

Then, build with the command line:

```bash
mothertongues prepare <path_to_language_configuration>
mothertongues run
```

And open your browser at `localhost:5000` to see your dictionary.

or build with Python:

```python
from mtd import create_dictionary
from mtd.app import app

dictionary = create_dictionary(<path_to_language_configuration>)
app.run()
```

Exporting a Dictionary
----------------------

Finally, you can export your dictionaries to JavaScript to be used with
an MTD frontend (See [User Interface](mtd-ui)) using
either the command line:

```bash
mothertongues export <path_to_language_configuration> js <output_dir>
```

Or Python:

```python
config_js = dictionary.return_formatted_config(form='js')

with open('config.js', 'w', encoding='utf8') as f:
    f.write(config_js)

dict_cached_js = dictionary.return_formatted_data(form='js')

with open('dict_cached.js', 'w', encoding='utf8') as f:
    f.write(dict_cached_js)
```

Or freeze your Dictionaries as a static site:

```bash
mothertongues export <path_to_language_configuration> web <output_dir>
```

:::important

API will not work as static site.
:::
