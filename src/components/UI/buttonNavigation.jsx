import PropTypes from 'prop-types';
import Button from '../button';

const ButtonNavigation = ({ ponyAction }) => (
    <div className="mt-8 md:mt-0 mb-4">
        <h4 className="mb-3 font-bold text-lg">
            Button Navigation
        </h4>
        <div className="grid grid-cols-2 gap-4">
            <Button
                click={() => ponyAction("west")}
                type="secondary"
                extraClasses="mb-4"
                size="small"
                text="Left"
            />
            <Button
                click={() => ponyAction("east")}
                type="secondary"
                extraClasses="mb-4"
                size="small"
                text="Right"
            />
            <Button
                click={() => ponyAction("north")}
                type="secondary"
                extraClasses="mb-4"
                size="small"
                text="Up"
            />
            <Button
                click={() => ponyAction("south")}
                type="secondary"
                extraClasses="mb-4"
                size="small"
                text="Down"
            />
        </div>
    </div>
);

ButtonNavigation.propTypes = {
    ponyAction: PropTypes.func.isRequired,
};

export default ButtonNavigation;
