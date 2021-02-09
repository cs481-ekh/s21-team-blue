export interface TestResults {
    result_test_id: String,
    result_description: String,
    result_date: Date,
    result_value: String
}

export interface Test {
    test_id: String,
    test_name: String,
    test_description: String,
    test_history: TestResults[],
    operating_systems: String,
    api_path: String
}
