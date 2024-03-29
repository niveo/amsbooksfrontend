import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export abstract class BaseHttpService {
  protected readonly http = inject(HttpClient);
  protected abstract path: string;
}
