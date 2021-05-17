---
id: mtd-guides-prepare
title: Preparing your data
---

*These guides assume you are comfortable with the [Command Line](https://en.wikipedia.org/wiki/Command-line_interface), [Git](https://en.wikipedia.org/wiki/Git) and [Python](https://en.wikipedia.org/wiki/Python_(programming_language)). You must have all of these installed on your machine. You are also strongly encouraged to have a [GitHub](https://github.com) account. You are encouraged to fork or clone the [Mother Tongues Dictionary Starter](https://github.com/roedoejet/mtd-starter) and follow along.*

The most time-intensive part of building your dictionary, depending on how you want to publish it, is preparing your data.

## File structure

It is recommended that you keep the following structure for your
dictionary.

:::note
This demo uses 'danish' as the example language - you should replace all instances of 'danish' with your language.
:::

```
📦mtd-danish
 ┣ 📂config
 ┃ ┣ 📜config.json
 ┃ ┗ 📜manifest.json
 ┣ 📂data
 ┃ ┗ 📜data.csv
 ┣ 📂resources
 ┃ ┣ 📜icon.png
 ┃ ┗ 📜splash.png
 ┣ 📂transducers
 ┃ ┗ 📜danish-approx.csv
 ┃ ┗ 📜danish-approx.yaml
 ┣ 📜.gitignore
 ┣ 📜LICENSE
 ┣ 📜README.md
 ┣ 📜alphabet.csv
 ┣ 📜index.html
 ┣ 📜package.json
 ┗ 📜requirements.txt
```

The folder struture of the [Mother Tongues Dictionary Starter](https://github.com/roedoejet/mtd-starter) follows this pattern which is part of why it's a good idea to use it to follow along.

In order to make your Mother Tongues dictionary, you will need to to create one [Language
Configuration](#mtd-language-configuration-file) file for your
dictionary and one [Resource
Configuration](#mtd-data-resource-configuration-file) file for *each*
source of data. 

## MTD Language Configuration file

:::tip
In the starter, the language configuration file is found here: `mtd-starter/config/config.json`
:::

Every language must have a configuration file, and it must be validated
against the following schema
[here.](https://roedoejet.github.io/mothertongues/mtd/languages/config_schema.json)
Below is a minimal Language Configuration file labelled
`danish_config.json`. 
```json
{
    "config":{
        "L1": "Danish",
        "L2": "English"
    },
    "data": [
        {
            "manifest": "./manifest.json",
            "resource": "../../data.csv"
        }
    ]
}
```

### Customized Alphabet

Adding your custom alphabet allows your entries to be sorted based on
that alphabet. If you don't use a custom alphabet, the English alphabet will be used instead.
In your Language Configuration file, set the `alphabet`
key equal to an array containing the letters in your language's
alphabet in alphabetical order:

```json {5}
{
    "config":{
        "L1": "Danish",
        "L2": "English",
        "alphabet": ["a", "b", "c"]
    },
    "data": [
        {
            "manifest": "./manifest.json",
            "resource": "../../data.csv"
        }
    ]
}
```

You can also reference a file that contains a csv of your alphabet:

```json {5}
{
    "config":{
        "L1": "Danish",
        "L2": "English",
        "alphabet": "../alphabet.csv"
    },
    "data": [
        {
            "manifest": "./manifest.json",
            "resource": "../../data.csv"
        }
    ]
}
```

:::tip
In the starter, an alphabet file is used at `mtd-starter/alphabet.csv`
:::

## MTD Data Resource Configuration file

:::tip
In the starter, the data resource configuration file is found here: `mtd-starter/config/manifest.json`
:::

Every data resource must have a configuration, and it must be validated
against the following schema
[here.](https://roedoejet.github.io/mothertongues/mtd/languages/manifest_schema.json)

Below is a minimal Data Configuration. This must be
referenced in the language configuration above. 

This configuration file
describes a CSV dictionary resource that only has two columns where the
first column includes the word in the target language and the second
column includes the 'definition' of that word or 'gloss' in the L2
language.

```json
{
    "name": "2017 Spreadsheet",
    "sorting": "word",
    "targets": {
        "word": "0",
        "definition": "1"
    }
}
```

In the future, I would like to have an online schema validation tool in
the vein of
[SwaggerHub](https://swagger.io/tools/swaggerhub/faster-api-design/). Help with this is welcome!


### Optional Information

To add information that can be optionally displayed in the UI, you must
point to it in your Data Resource configuration file. For example, if
you wanted to add "Part of Speech" information that could be displayed
optionally and that was present in column "F" of an Excel spreadsheet, you
would add the following to your Data Resource configuration file:


```json {7-11}
{
    "name": "2018 Spreadsheet",
    "sorting": "word",
    "targets": {
        "word": "A",
        "definition": "B",
         "optional": [
            { 
                "Part of Speech": "F"
            }
        ]
    }
}
```

### Multimedia

To add images and audio, you must have the filenames of your files in
your dictionary data resource. Then, change your Data Resource
configuration files to point to the location of the filenames.

#### Images

For images, just add a target for the `img` key. Take the following
example for an Excel spreadsheet with image filenames in column "D":


```json {7}
{
    "name": "2018 Spreadsheet",
    "sorting": "word",
    "targets": {
        "word": "A",
        "definition": "B",
        "img": "D"
    }
}
```

#### Audio

For audio, you minimally have to add the filename, but you can also add
a speaker name. You can also choose between `audio` for audio files in
the target language, `definition_audio` for audio files of the
definition, `example_sentence_audio` for audio files corresponding to an
example sentence and `example_sentence_definition_audio` for audio files
corresponding to the definitions of example sentences.

Take the following example for an Excel spreadsheet with audio in
columns "B" & "C" and example sentence audio in column "D". The
speaker names for audio files are in columns "E", "F", and "G"
respectively.

```json {7-24}
{
    "name": "2018 Spreadsheet",
    "sorting": "word",
    "targets": {
        "word": "A",
        "definition": "H",
        "audio": [
            { 
                "filename": "B",
                "speaker": "E" 
            },
            { 
                "filename": "C",
                "speaker": "F" 
            } 
        ],
        "example_sentence_audio": [
            [
                {
                    "filename": "D",
                    "speaker": "G"
                }
            ]
        ]
    }
}
```

### Semantic Categories

To add semantic categories to your entries, you can make use of both the
`theme` and `secondary_theme` keys in the Data Resource configuration
file. Using these will allow your entries to be sorted based on semantic
categories like "colours", or "animals" etc.

For example, suppose you have an Excel spreadsheet where column "A"
has main categories like "Animals", and column "B" has
sub-categories like "- Fish", and "- Reptiles". Your Data Resource
congfiguration file would have to add the following targets:

```json {7-8}
{
    "name": "2020 Spreadsheet",
    "sorting": "word",
    "targets": {
        "word": "C",
        "definition": "D",
        "theme": "A",
        "secondary_theme": "B"
    }
}
```

## Approximate Search

Approximate search isn't just a *nice* feature for dictionaries of
endangered languages - it's usually a requirement. Often, it's
learners of languages that want to use dictionaries the most, and if
your dictionary doesn't allow approximate search, beginners might have
a hard time accessing entries in the dictionary.

### How does it work?

Basically, you need to tell MotherTongues two things: a list of predictable mistakes, and a corresponding list of what characters the user likely *meant* to type instead.

The way you 'tell' MotherTongues these things is through the use of a character mapping file. MotherTongues makes use of the [g2p](https://github.com/roedoejet/g2p) Python Library which also has a corresponding [website](https://g2p-studio.herokuapp.com). As per the `g2p` library, for each mapping, you need either a `csv` or `json` file, and an
accompanying `yaml` configuration file.

:::tip
These files are in the mtd-starter repository at `mtd-starter/transducers`
:::

A possible configuration file could look like this:

```yaml
mapping: danish-approx.csv
norm_form: NFC
escape_special: true
case_sensitive: false
authors:
  - Aidan Pine
```

:::note
Please have a look at the [g2p docs](https://g2p.readthedocs.io/en/latest/?badge=latest) or [g2p readme](https://github.com/roedoejet/g2p) for more information
:::

You might want to make these `mappings` for a variety of reasons.

Typical learner/user mistakes come from the following issues:

1. Learners have a hard time hearing the difference between sounds.
2. Learners don't often know how to spell the different sounds.
3. Some languages make it tricky to type, even if you can hear the difference and know how to spell the word.

:::note
See [this
paper](http://roedoejet.github.io/cv/static/cv/pdfs/computel.pdf) for
further discussion.
:::

### Creating a single mapping

For example, in Gitksan, a learner might have a difficult time hearing the difference between a `k` (/k/ in the phonetic alphabet) and a `ḵ` (/q/ in the phonetic alphabet). So, we can write a configuration file like so:

```yaml
mapping: gitksan-approx.csv
norm_form: NFC
escape_special: true
case_sensitive: false
authors:
  - Aidan Pine
```

and a csv file (`gitksan-approx.csv`) like so:

```csv
ḵ,k
```

We then update the [Data Resource configuration](mtd-data-resource-configuration-file) to include the following changes:

```json {6-15}
{
   "file_type":"csv",
   "name":"words",
   "display":"word",
   "sorting":"sort_form",
   "compare":"compare_form",
   "transducers":[
      {
         "source":"word",
         "target":"compare_form",
         "functions":[
            "../transducers/gitksan-approx.yaml"
         ]
      }
   ],
   "targets":{
      "entryID":"0",
      "definition":"1",
      "word":"2",
      "audio":[
         {
            "speaker":"3",
            "filename":"4"
         }
      ],
      "theme":"5",
      "optional":[
         {
            "Pronunciation":"6"
         }
      ]
   }
}
```

### Creating a 'composite' mapping

To string multiple mappings together, we can use a 'composite' mapping. This is a json file that contains only a list of the names of the mappings. 

So assuming a structure like with the following 'mappings' (also known as 'transducers'):

```raw {10-14}
📦mtd-danish
 ┣ 📂config
 ┃ ┣ 📜config.json
 ┃ ┗ 📜manifest.json
 ┣ 📂data
 ┃ ┗ 📜data.csv
 ┣ 📂resources
 ┃ ┣ 📜icon.png
 ┃ ┗ 📜splash.png
 ┣ 📂transducers
 ┃ ┗ 📜danish-approx.csv
 ┃ ┗ 📜danish-approx.yaml
 ┃ ┗ 📜danish-norm.csv
 ┃ ┗ 📜danish-norm.yaml
 ┣ 📜.gitignore
 ┣ 📜LICENSE
 ┣ 📜README.md
 ┣ 📜alphabet.csv
 ┣ 📜index.html
 ┗ 📜requirements.txt
```

We then add all the mappings we want to a json file:

```json
["danish-approx", "danish-norm"]
```

If we want to use this transducer in our dictionary, we then make the following changes to the [Data Resource Configuration](mtd-data-resource-configuration-file):

```json {6-15}
{
   "file_type":"csv",
   "name":"words",
   "display":"word",
   "sorting":"sort_form",
   "compare":"compare_form",
   "transducers":[
      {
         "source":"word",
         "target":"compare_form",
         "functions":[
            "../transducers/gitksan-compare-composite.json"
         ]
      }
   ],
   "targets":{
      "entryID":"0",
      "definition":"1",
      "word":"2",
      "audio":[
         {
            "speaker":"3",
            "filename":"4"
         }
      ],
      "theme":"5",
      "optional":[
         {
            "Pronunciation":"6"
         }
      ]
   }
}
```

### Plain functions

:::note
This is advanced! Don't be discouraged if you don't understand this. Have a look at [Python lambda functions](https://www.w3schools.com/python/python_lambda.asp) to get an idea of what's going on here.
:::

You can write any lambda function instead of a transducer to process data. For example, to turn all words into upper case and store them as `upper_form`, you would do the following:

```json {15-21}
{
   "file_type":"csv",
   "name":"words",
   "display":"word",
   "sorting":"sort_form",
   "compare":"compare_form",
   "transducers":[
      {
         "source":"word",
         "target":"compare_form",
         "functions":[
            "../transducers/gitksan-compare-composite.json"
         ]
      },
      {
         "source": "word",
         "target": "upper_form",
         "functions": [
            "lambda x: x.upper()"
         ]
      }
   ],
   "targets":{
      "entryID":"0",
      "definition":"1",
      "word":"2",
      "audio":[
         {
            "speaker":"3",
            "filename":"4"
         }
      ],
      "theme":"5",
      "optional":[
         {
            "Pronunciation":"6"
         }
      ]
   }
}
```

## Seeing your dictionary in action!

Once you have prepared a Language Configuration and Resource
Configuration files for each source of data, you need to let `mothertongues` put it all together! 
This will parse all of the data according to your specifications, combine all of your sources of data,
sort your data according to your alphabet, and generate the code necessary for your approximate search to work.


This guide assumes that you have worked through the steps to create a valid [Language Configuration file](#mtd-language-configuration-file) and [Data Resource Configuration files](#mtd-data-resource-configuration-file) for each unique source of data. It also assumes you have a directory
structure similar to the one [described in this guide](#file-structure).

First, in the command line, run the `mtd prepare` command. You will need to point this
command at the directory with your configuration files:

`mtd prepare <directory path>`

For example, if you are within your working directory:

`mtd prepare .`

If successful, you will see the message:

```
Successfully built static files for the following dictionaries:
<AllYourDictionariesHere>. You may now run the app.
```

Next, you can run the app using `mtd run`. This will run the app with
the default Mother Tongues mobile UI. You can view it at by going to [http://localhost:5000/](http://localhost:5000/) in your browser.

To use a different UI, see [Adding
a User Interface](mtd-guides-ui). To build and publish the
app on Google Play or the Apple App Store, see [Publishing your Mother
Tongues Dictionary](mtd-guides-publishing).

:::tip
If you just edit the configuration files in your clone/fork of the `mtd-starter` repo and push the changes, the demo will be automatically built and available at `https://YOUR_GITHUB_USERNAME.github.io/mtd-starter/`. Note that you will have to [enable GitHub Actions](https://docs.github.com/en/github/administering-a-repository/disabling-or-limiting-github-actions-for-a-repository#managing-github-actions-permissions-for-your-repository) on your MTD starter for the automatic builds to work.
:::