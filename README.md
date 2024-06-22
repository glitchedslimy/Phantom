# ✨ Phantom ✨

Phantom is a _smart_, _fast_, _minimal_ and _modern_ theme/extension.

## Why Phantom?

### Why theme/extension?
Phantom comes with a bunch of features, _is not only a regular theme for VSCode_. I like to have my VSCode decluttered of extension so I try to implement as much as I can here in this extension.

### Features
- **Markdown Flavoured**, you don't need to install any other extension for flavouring your markdown as Github has. _Phantom_ comes with it by default.

- **Custom Accents**, Having to choose one color is a bit boring, so I decided to give the possibility to change the whole accent color the theme dynamically on the configuration.

- **Minimal as possible**, even tho _Phantom_ comes with a bunch of features, it tries to be as minimal as possible to occupy less and charge faster than other extensions.

- **I am open to changes**, you can suggest a change and I can review it, who knows, maybe I like the idea and ends up implemented inside the theme/extension.

- **Smart**, Phantom can adapt, if you choose for example a custom accent that is too dark, phantom will automatically adapt the font color to be white, same with black if its too light.

### Requirements
_Phantom_ doesn't have external requirements, I try to maintain everything locally to offer a secure experience, all the code from the markdown flavour, to the customization is made by me _(with some help of google of course, who are we gona lie?)_.

### I don't trust you neither Phantom
That's a fair concern now a days with all the controversy related with VSCode extension and it's marketplace as the extensions are not sandboxed.

**But, please, allow me to convince you.**

_Phantom_, of course, as any other extension reads files from the system to realize features for the extension. **Have this in mind**.

But the files that _Phantom_ reads are **ONLY** and **EXCLUSIVELY** used for the theme, I don't intent to do any malicious activity neither create the biggest botnet of all time.

The things that _Phantom_ uses to read files are:
- Workspace vscode function (read configuration from the settings.json, but only the phantom ones)
- As well: `Uri.file(join(__dirname, '../', 'themes', fileName));` this is used to update the theme dynamically. If you want to check out yourself is under the `updateTheme.ts` file inside `theme` folder.

_If you still don't trust me, you can review the code yourself, is Open for everyone to view it._

Feel free to do an extension scan with some tool to verify it as well, and as well a scan with some Virus detection tool to check out.

**Also, this is important due to the concerns about selling stuff to unknown enterprises/sources, _Phantom_, well, more _myself_ doesn't have the intent to sell this extension to any enterprise or individual, my idea is to keep the ownership and supervision of the extension.**



## Extension Settings

Phantom has some simple settings you can tweak to "customize" your experience a little bit.

This extension contributes the following settings:

* `phantom.accentColor`: Changes the accent color of the components inside the theme.

## Known Issues

There are no known issues as for now.

## Release Notes

The release notes are under the `CHANGELOG.md` file, and if you have the theme installed, you can do the following:

1. `Ctrl + shift + P` to open the command palette.
2. Search for phantom, there is a command which is: `Show Changelog`.
3. Open it, you will see all the Changelog in a Webview inside VSCode.

## Contributions
I usually work alone and I don't intent to work with some other people right now, if you are interested just follow the project and support it.

Maybe in the future my mind will change and I put some kind of team working into this extension/theme.

## License
The project will be kept as **Open Source**, but that doesn't mean you can do whatever you want with the code, so please, I can't control what all the people do, but be nice.

Read the `LICENSE` file there is on the project to inform yourself first.