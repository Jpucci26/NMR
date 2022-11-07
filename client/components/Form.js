export const Form = ({ children, onSubmit }) => {

    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(e);
    }
  
    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-8 divide-y divide-gray-200"
      >
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">          
              {children}
            </div>
          </div>
        </div>
      </form>
    );
  };
  