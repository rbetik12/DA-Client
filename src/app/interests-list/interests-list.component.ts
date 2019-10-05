import { Component, EventEmitter, Output } from '@angular/core';
import { MatListOption } from '@angular/material';

@Component({
    selector: 'app-interests-list',
    templateUrl: './interests-list.component.html',
    styleUrls: ['./interests-list.component.scss']
})
export class InterestsListComponent {
    @Output() selected = new EventEmitter<MatListOption[]>();
    interestsCategories: string[] = ['Music', 'Food', 'Traveling', 'Culture', 'Books'];

    onSelect(selected: MatListOption[]) {
        this.selected.emit(selected);
    }
}
