import { TextFileView } from "obsidian";

export const VIEW_TYPE_CSV = "csv-view";

export class CSVView extends TextFileView {
  tableData: string[][];
  tableEl: HTMLElement;

  getViewData() {
    console.log("table", this.tableData);

    return this.tableData.map((row) => row.join(",")).join("\n");
  }

  // If clear is set, then it means we're opening a completely different file.
  setViewData(data: string, clear: boolean) {
    console.log("data", data);

    this.tableData = data.split("\n").map((line) => line.split(","));
    console.log("aa", this.tableData);

    this.refresh();
  }

  refresh() {
    this.tableEl.empty();

    const tableBody = this.tableEl.createEl("tbody");

    this.tableData.forEach((row, i) => {
      const tableRow = tableBody.createEl("tr");

      row.forEach((cell, j) => {
        const input = tableRow
          .createEl("td")
          .createEl("input", { attr: { value: cell } });

        input.oninput = (ev) => {
          if (ev.currentTarget instanceof HTMLInputElement) {
            this.tableData[i][j] = ev.currentTarget.value;
            this.requestSave();
          }
        };
      });
    });
  }

  clear() {
    this.tableData = [];
    console.log("clear", this.tableData);
  }

  getViewType() {
    return VIEW_TYPE_CSV;
  }

  async onOpen() {
    console.log("open", this.tableData);

    this.tableEl = this.contentEl.createEl("table");
  }

  async onClose() {
    this.contentEl.empty();
    console.log("close", this.tableData);
  }
}
