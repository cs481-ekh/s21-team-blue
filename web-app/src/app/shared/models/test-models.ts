export interface TestResults {
    result_test_id: string,
    result_description: string,
    result_date: string,
    result_value: string
}

export interface Test {
    test_id: string,
    test_name: string,
    test_description: string,
    test_history: TestResults[],
    operating_systems: string,
    api_path: string
}
