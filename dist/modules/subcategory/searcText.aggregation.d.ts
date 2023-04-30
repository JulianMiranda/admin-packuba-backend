import * as mongoose from 'mongoose';
export declare const searchText: (id: string) => ({
    $match: {
        _id: mongoose.Types.ObjectId;
    };
    $addFields?: undefined;
    $project?: undefined;
} | {
    $addFields: {
        cont: {
            $reduce: {
                input: string;
                initialValue: string;
                in: {
                    $cond: {
                        if: {
                            $eq: (number | {
                                $indexOfArray: string[];
                            })[];
                        };
                        then: {
                            $concat: string[];
                        };
                        else: {
                            $concat: string[];
                        };
                    };
                };
            };
        };
        title?: undefined;
        values?: undefined;
    };
    $match?: undefined;
    $project?: undefined;
} | {
    $addFields: {
        title: {
            $reduce: {
                input: string;
                initialValue: string;
                in: {
                    $cond: {
                        if: {
                            $eq: (number | {
                                $indexOfArray: string[];
                            })[];
                        };
                        then: {
                            $concat: string[];
                        };
                        else: {
                            $concat: string[];
                        };
                    };
                };
            };
        };
        cont?: undefined;
        values?: undefined;
    };
    $match?: undefined;
    $project?: undefined;
} | {
    $addFields: {
        values: {
            $reduce: {
                input: string;
                initialValue: string;
                in: {
                    $cond: {
                        if: {
                            $eq: (number | {
                                $indexOfArray: string[];
                            })[];
                        };
                        then: {
                            $concat: string[];
                        };
                        else: {
                            $concat: string[];
                        };
                    };
                };
            };
        };
        cont?: undefined;
        title?: undefined;
    };
    $match?: undefined;
    $project?: undefined;
} | {
    $project: {
        cont: number;
        title: number;
        textSearch: {
            $concat: (string | {
                $ifNull: (string | {
                    $toString: string;
                })[];
            })[];
        };
    };
    $match?: undefined;
    $addFields?: undefined;
})[];
