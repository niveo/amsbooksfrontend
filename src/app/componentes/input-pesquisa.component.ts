import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsProviderUserModule } from '../modules/icons-provider-user.module';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-input-pesquisa-component',
  template: `<nz-input-group
      nzSearch
      nzSize="large"
      [nzSuffix]="inputClearTpl"
      [nzPrefix]="suffixIconSearch"
      style="margin-bottom: 10px"
    >
      <input
        type="text"
        nz-input
        placeholder="Informe aqui sua pesquisa..."
        [(ngModel)]="searchValue"
        (ngModelChange)="onSearchUpdated($event)"
      />
    </nz-input-group>
    <ng-template #inputClearTpl>
      @if (searchValue) {
      <span
        nz-icon
        class="ant-input-clear-icon"
        nzTheme="fill"
        nzType="close-circle"
        (click)="searchValue = ''; onSearchUpdated('')"
      ></span>
      }
    </ng-template>
    <ng-template #suffixIconSearch>
      <span nz-icon nzType="search"></span>
    </ng-template>`,
  styles: [
    `
      nz-input-group {
        border: none;
        background-color: unset;
      }
      .ant-input {
        border: none;
        background-color: unset;
      }
      .ant-input-affix-wrapper:hover {
        border-color: unset;
        border-right-width: 0px;
      }
      .ant-input-affix-wrapper:focus,
      .ant-input-affix-wrapper-focused {
        border-color: unset;
        border-right-width: 0px;
        box-shadow: none;
      }
    `,
  ],
  standalone: true,
  imports: [FormsModule, IconsProviderUserModule, NzInputModule],
})
export class InputPesquisaComponent {
  searchValue: string;

  @Output()
  eventSearch = new EventEmitter<string>();

  onSearchUpdated(value) {
    this.eventSearch.emit(value);
  }
}
