import { App, PluginSettingTab, Setting } from 'obsidian';
import ProjectFolder from './main';

export interface ProjectFolderSettings {
	projectRootPath: string;
}

export const DEFAULT_SETTINGS: ProjectFolderSettings = {
	projectRootPath: '',
};

export class ProjectFolderSettingTab extends PluginSettingTab {
	plugin: ProjectFolder;

	constructor(app: App, plugin: ProjectFolder) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Project root')
			.setDesc("Path to the root of where projects will be stored")
			.addText((text) =>
				text
					.setPlaceholder('')
					.setValue(this.plugin.settings.projectRootPath)
					.onChange(async (value) => {
						this.plugin.settings.projectRootPath = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}
