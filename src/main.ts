import {
	Editor,
	MarkdownView,
	MarkdownFileInfo,
	Modal,
	Notice,
	Plugin,
} from 'obsidian';
import {
	DEFAULT_SETTINGS,
	ProjectFolderSettings,
	ProjectFolderSettingTab,
} from './settings';

// Remember to rename these classes and interfaces!

export default class ProjectFolder extends Plugin {
	settings!: ProjectFolderSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon.
		this.addRibbonIcon('folder', 'Project', (_evt: MouseEvent) => {
			// Called when the user clicks the icon.
			new Notice('This will eventually create a project!');
		});

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		// const statusBarItemEl = this.addStatusBarItem();
		// statusBarItemEl.setText('Status bar text');

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'create-project',
			name: 'Create Project',
			callback: () => {
				new ProjectModel(this.app).open();
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ProjectFolderSettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<ProjectFolderSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class ProjectModel extends Modal {
	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Woah! A new project here soon?');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
