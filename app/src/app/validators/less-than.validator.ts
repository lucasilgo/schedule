import { FormGroup } from '@angular/forms';

export function LessThan(controlFinishDate: string, controlStartDate: string) {
    return (formGroup: FormGroup) => {
        const finishDate = formGroup.controls[controlFinishDate];
        const startDate = formGroup.controls[controlStartDate];

        if (!finishDate.value || !startDate.value || finishDate.errors || startDate.errors) {
            return;
        }

        if (new Date(startDate.value) > new Date(finishDate.value)) {
            finishDate.setErrors({ lessThan: true })
        }
    }
}