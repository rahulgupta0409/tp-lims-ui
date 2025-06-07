import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";
// import { GET_ALL_MINOR_LAB_TESTS } from "../../apis/MinorTestAPI";
// import { ADD_MAJOR_LAB_TEST } from "../../apis/MajorTestAPI";
// import Navbars from "../../components/navbar/Nav";
import { Button } from "@mui/material";
import { addMajorLabTest, getAllMinorTest } from "../../../actions";
import { useAppDispatch } from "../../../customHooks/useDispatch";
import Input from "../../../components/input";
import "./style.scss";
import CurrencyInput from "react-currency-input-field";

interface MinorTest {
    testName: string;
    testPrice: number;
    label?: string;
    value?: string;
    idx?: number;
}

interface MajorTestState {
    majorTestName: string;
    minorLabTestList: MinorTest[];
    majorTestPrice: number;
    majorTestRemarks: string;
}

const Majortests: React.FC = () => {
    const [majorTests, setMajorTests] = useState<MajorTestState>({
        majorTestName: "",
        minorLabTestList: [],
        majorTestPrice: 0.0,
        majorTestRemarks: "",
    });
    const [minorLabTests, setMinorLabTests] = useState<MinorTest[]>([]);
    const [selectValue, setSelectValue] = useState<MinorTest[]>([]);
    const [price, setPrice] = useState<number>(0);
    const formRef = useRef<HTMLFormElement | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchMinorTests = async () => {
            try {
                const res: any[] = await dispatch(getAllMinorTest());
                setMinorLabTests(
                    res.map((h: MinorTest, idx: number) => ({
                        ...h,
                        label: h.testName,
                        value: h.testName,
                        idx: idx,
                    }))
                );
            } catch (error) {
                console.error("Error fetching minor tests:", error);
            }
        };
        fetchMinorTests();
    }, []);

    const handleOnChange = (param: keyof MajorTestState, value: string | number) => {
        setMajorTests((prevState) => ({
            ...prevState,
            [param]: param === "majorTestPrice" ? parseFloat(value as string) : value,
        }));
    };

    const handleChange = (selected: any) => {
        setSelectValue(selected);
    };

    const handleReset = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
    };

    useEffect(() => {
        setPrice(getTestPrice());
    }, [selectValue]);

    const getTestPrice = (): number => {
        return selectValue.reduce((acc, test) => acc + test.testPrice, 0);
    };

    const handleOnClick = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(addMajorLabTest(
            {
                majorTestName: majorTests.majorTestName,
                price,
                selectValue,
                majorTestRemarks: majorTests.majorTestRemarks
            }
        ));
        handleReset();
    };

    return (
        <div>
            {/* <Navbars /> */}
            <div className="majortest-container">
                <form ref={formRef} className="majortest-form" onSubmit={handleOnClick}>
                    <h2 className="h2">ADD MAJOR TEST</h2>
                    <Input
                        name="majorTestName"
                        type="text"
                        placeholder="Enter test name..."
                        value={majorTests.majorTestName}
                        label="Test Name"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange("majorTestName", e.target.value)
                        }
                    />
                    <div className="row">
                        <div className="label">Minor Tests</div>
                        <Select
                            closeMenuOnSelect={false}
                            isMulti
                            name="minorTests"
                            options={minorLabTests}
                            value={selectValue}
                            onChange={handleChange}
                            className="custom-input"
                            classNamePrefix="select"
                        />
                    </div>
                    <div className="row">
                        <div className="label">Test Price</div>
                        <CurrencyInput
                            name="majorTestPrice"
                            placeholder="Enter test price..."
                            defaultValue={price}
                            decimalsLimit={2}
                            prefix="₹ "
                            onValueChange={(value) => {
                                setPrice(parseFloat(value || '0'));
                            }}
                            className="currency-input"
                        />
                    </div>
                    <Input
                        name="majorTestRemarks"
                        type="text"
                        placeholder="Enter test remarks..."
                        value={majorTests.majorTestRemarks}
                        label="Remarks"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleOnChange("majorTestRemarks", e.target.value)
                        }
                    />
                    <div className="row">
                        <Button className="submin-majortest" type="submit">
                            ADD
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Majortests;
