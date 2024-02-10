import React, { useState, useEffect, useRef, FC } from 'react';
import { Input } from 'native-base';
import { Assessment } from './AssesmentType';

interface NumericInputProps {
    item: Assessment;
    onGradeChange: (text: string, studentId: string) => void;
}

const NumericInput: FC<NumericInputProps> = ({ item, onGradeChange }) => {
    const [value, setValue] = useState<string>(item.result?.toString() ?? '');
    const inputRef = useRef<any>(null);

    useEffect(() => {
        setValue(item.result?.toString() ?? '');
    }, [item.result]);

    return (
        <Input
            ref={inputRef}
            width="20%"
            variant="filled"
            isReadOnly={!!item.isSubmitted}
            backgroundColor="#31C32E26"
            keyboardType="numeric"
            value={value}
            onChangeText={(text) => {
                setValue(text);
                onGradeChange(text, item.student.studentId);
            }}
            placeholder="N/A"
            textAlign="center"
            fontSize="sm"
            fontWeight="semibold"
            color="#31C32E"
        />
    );
};

export default NumericInput;