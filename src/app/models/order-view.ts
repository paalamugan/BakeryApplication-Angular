

export class OrderView {
    public name: string;
    public mobile: string;
    public expectedDate: Date;
    public hour: number;
    public minutes: number;

    constructor(name: string, mobile: string, expectedDate: Date, hour: number, minutes: number) {
        this.name = name;
        this.mobile = mobile;
        this.expectedDate = expectedDate;
        this.hour = hour;
        this.minutes = minutes;
    }


}
