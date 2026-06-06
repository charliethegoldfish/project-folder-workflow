import { App, PluginSettingTab, Setting } from 'obsidian';
import ProjectFolder from './main';

export interface ProjectFolderSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: ProjectFolderSettings = {
	mySetting: 'default',
};

export class SampleSettingTab extends PluginSettingTab {
	plugin: ProjectFolder;

	constructor(app: App, plugin: ProjectFolder) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Settings #1')
			.setDesc("It's a secret")
			.addText((text) =>
				text
					.setPlaceholder('Enter your secret')
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.mySetting = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
